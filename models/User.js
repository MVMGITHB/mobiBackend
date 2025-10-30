import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    password: { type: String, required: true },
    dateOfBirth: { type: String },
   
    image:{
     type:String,
    },

    status:{
      type:String,
      default:"Inactive"
    },

    role: {
      type: String,
      enum: ['user', 'admin', 'superAdmin', 'seoAdmin'],
      default: 'user',
    },

    shortBio:{
       type:String,
    },

    tag:{
      type:String,
    },


    slug: {
      type: String,
      // unique: true,
      index: true,
    },

socialMedia: {
      facebook: { type: String },
      linkedin: { type: String },
      twitter: { type: String },
      profile: { type: String }
  },

  blog:[{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Blog', 
          default: null,
        }],


   isVerified: {
      type: Boolean,
      default: false,
    },

    verificationToken: {
      type:String,
    },
  },


  
  


  { timestamps: true }

  
);



// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
