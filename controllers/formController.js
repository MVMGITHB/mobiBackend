import Form from "../models/form.js";

// ✅ Create new form
export const createForm = async (req, res) => {
  try {
    const form = new Form(req.body);
    await form.save();
    res.status(201).json({ message: "Form created successfully", form });
  } catch (error) {
    console.error("Create error:", error);
    res.status(500).json({ message: "Failed to create form", error });
  }
};

// ✅ Get all forms
export const getForms = async (req, res) => {
  try {
    const forms = await Form.find().sort({ createdAt: -1 });
    res.status(200).json(forms);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ message: "Failed to fetch forms", error });
  }
};

// ✅ Get single form by ID
export const getFormById = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) return res.status(404).json({ message: "Form not found" });
    res.status(200).json(form);
  } catch (error) {
    console.error("Fetch single error:", error);
    res.status(500).json({ message: "Failed to fetch form", error });
  }
};

// ✅ Update form by ID
export const updateForm = async (req, res) => {
  try {
    const updatedForm = await Form.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedForm) return res.status(404).json({ message: "Form not found" });
    res.status(200).json({ message: "Form updated successfully", updatedForm });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Failed to update form", error });
  }
};

// ✅ Delete form by ID
export const deleteForm = async (req, res) => {
  try {
    const deletedForm = await Form.findByIdAndDelete(req.params.id);
    if (!deletedForm) return res.status(404).json({ message: "Form not found" });
    res.status(200).json({ message: "Form deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Failed to delete form", error });
  }
};
