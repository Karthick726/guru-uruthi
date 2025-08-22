const Contact=require("../Schema/ContactSchema")


exports.addContact = async (req, res) => {
  try {
    const { name, email, message, phone, country, products } = req.body;

    // validation (optional but recommended)
    if (!name || !email || !message || !phone || !country) {
      return res.status(400).json({ error: "All required fields must be provided" });
    }

    const newContact = new Contact({
      name,
      email,
      message,
      phone,
      country,
      products,
    });

    await newContact.save();
    res.status(200).json({ message: "Contact saved successfully", data: newContact });
  } catch (err) {
    console.error("Error saving contact:", err);
    res.status(500).json({ error: "Server error while saving contact" });
  }
};


exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find(); 
    res.status(200).json(contacts);
  } catch (err) {
    console.error("Error fetching contacts:", err);
    res.status(500).json({ error: "Server error while fetching contacts" });
  }
};