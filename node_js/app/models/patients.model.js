module.exports = mongoose => {
  const schema = mongoose.Schema(
    { Id: String, Name: String, OrderId: Number }
  );

  const Patients = mongoose.model('Patients', schema);
  return Patients;
};
