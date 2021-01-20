const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllUsers = catchAsync(async (req, res, next) => {
   
        const Users = await User.find();

        if(!Users){
           return next(new AppError('No Users found.', 404));
        }
    
        res.status(200).json({
            status: 'success',
            results: Users.length,
            data: {
                Users
            }
        });

});

exports.getUser = catchAsync(async (req, res, next) => {
   
        const User = await User.findById(req.params.id).populate('students');

        if(!User){
           return next(new AppError('No class with this ID.',404));
        }
        
        res.status(200).json({
            status: 'success',
            data: {
                User
            }
        });
       
});

exports.createUser = catchAsync(async (req, res, next) => {
    
    const newUser = await User.create(req.body).catch(err => {
        return next(new AppError('Invalid class to create.',400));
    });

    res.status(201).json({
        status: 'success',
        data: {
            User: newUser
        }
    });
    
});

exports.updateUser = catchAsync(async (req, res, next) => {
    
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});

        if(!user){
            return next(new AppError('No user with this ID OR Invalid fields to update.',404));
        }

        res.status(201).json({
            status: 'success'
        });

    
});

exports.deleteUser = catchAsync(async (req, res, next) => {
   
        const user = await User.findByIdAndDelete(req.params.id);

        if(!user){
            return next(new AppError('No User with this ID.',404));
        }

        res.status(204).json({
            status: 'success',
            data: null
        });

});