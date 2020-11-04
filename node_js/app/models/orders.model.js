module.exports = mongoose => {
  const schema = mongoose.Schema(
    { Id: Number, Message: String }
  );

  const Orders = mongoose.model('Orders', schema);
  return Orders;
};
