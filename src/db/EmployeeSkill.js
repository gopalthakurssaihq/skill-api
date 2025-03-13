const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, // Ensure lowercase for uniqueness
    trim: true
  },
  employeeNumber: { type: String, required: true, unique: true },
  skills: [
    {
      category: { type: String, required: true, trim: true, lowercase: true, default: 'na' },
      name: { type: String, required: true, trim: true, lowercase: true }, // Normalize skill names
      expertise: {
        type: String,
        required: true,
        default: 'none'
      }
    }
  ]
});

// Middleware to remove duplicate skills before saving
EmployeeSchema.pre('save', function (next) {
  if (this.skills && this.skills.length) {
    const uniqueSkills = [];
    const skillSet = new Set();

    this.skills.forEach((skill) => {
      const skillKey = skill.name.toLowerCase(); // Normalize skill names
      if (!skillSet.has(skillKey)) {
        skillSet.add(skillKey);
        uniqueSkills.push(skill);
      }
    });

    this.skills = uniqueSkills;
  }
  next();
});

module.exports = mongoose.model('employeeskills', EmployeeSchema);
