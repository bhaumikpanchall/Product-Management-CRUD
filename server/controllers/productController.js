import Product from '../models/Product.js';

export const createProduct = async (req, res) => {
  const { name, price, category } = req.body;
  if (!name || price === undefined || !category) {
    return res.status(400).json({ message: 'Name, price, and category are required' });
  }

  try {
    const product = await Product.create({
      name,
      price,
      category,
      createdBy: req.user._id,
    });
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create product' });
  }
};

export const getProducts = async (req, res) => {
  const {
    search = '',
    category = '',
    minPrice,
    maxPrice,
    page = 1,
    limit = 10,
  } = req.query;

  const query = { createdBy: req.user._id };

  if (search) {
    query.name = { $regex: search, $options: 'i' };
  }

  if (category && category.toLowerCase() !== 'all') {
    query.category = { $regex: category, $options: 'i' };
  }

  const hasMin = minPrice !== undefined && minPrice !== '';
  const hasMax = maxPrice !== undefined && maxPrice !== '';

  if (hasMin || hasMax) {
    query.price = {};
    if (hasMin) query.price.$gte = Number(minPrice);
    if (hasMax) query.price.$lte = Number(maxPrice);
  }

  const numericLimit = Math.max(1, Number(limit));
  const numericPage = Math.max(1, Number(page));
  const skip = (numericPage - 1) * numericLimit;

  try {
    const [products, total] = await Promise.all([
      Product.find(query).sort({ createdAt: -1 }).skip(skip).limit(numericLimit),
      Product.countDocuments(query),
    ]);

    return res.json({
      data: products,
      pagination: {
        total,
        page: numericPage,
        limit: numericLimit,
        pages: Math.ceil(total / numericLimit) || 1,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to load products' });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, category } = req.body;

  try {
    const product = await Product.findOneAndUpdate(
      { _id: id, createdBy: req.user._id },
      { name, price, category },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.json(product);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update product' });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findOneAndDelete({ _id: id, createdBy: req.user._id });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.json({ message: 'Product deleted' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete product' });
  }
};

