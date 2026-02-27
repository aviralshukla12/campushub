import { asyncHandler } from "../utils/asyncHandler.js";

import {Course} from "../models/course.model.js";

const createCourse = asyncHandler(async(req,req) => {
    try{
    const {title , description , Coursecode , credits , department , semester} = req.body;
    //only faculty can create the course
    if(req.user.role !== "faculty"){
        return res.status(403).json({
            success:false,
            message: "Unauthorized to create course"
        })
    }
        
    if(!title && !description && !Coursecode && !credits  && !department && !semester){
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }
    const course = await Course.create({
        title,
        description,
        Coursecode,
        credits,
        department,
        semester,
        createdBy: req.user?._id
    })
    return res.status(201).json({
        success : true,
        message  : "Course created successfully",
        course,
        
    })

        }
    catch(error){
        return res.status(500).json({
            success : false,
            message: "Error while creating course",
            error  : error.message
        });

    }

});

const editcourse = asyncHandler(async(req,res) => {
    try{
    const {title , description , Coursecode , credits , department , semester} = req.body;
    const course  = await Course.findByCourseCode(req.params.courseCode);
    if(!course){
        return res.status(404).json({
            success:false,
            message  : "Course not found"
        })
    }
    // only faculty can edit the course
    if( !req.user || req.user.role !== "faculty"){
        return res.status(403).json({
            success:false,
            message:"Unauthorized to edit course"
        })
    }
    course.title = title || course.title;
    course.description = description || course.description;
    course.Coursecode = Coursecode || course.Coursecode;
    course.credits = credits || course.credits;
    course.department = department || course.department;
    course.semester = semester || course.semester;
    await course.save();
    return res.status(200).json({
        success:true,
        message:"Course updated successfully",
        course,
    })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message: "Error while updating course",
            error:error.message
        })

    }
})
const deleteCourse = asyncHandler(async(req, res) => {
    try{
        const course  = await Course.findByCourseCode(req.params.courseCode);
        if(!course){
            return res.status(404).json({
                success:false,
                message : "Course not found"
            });
        }
        //only faculty can delete the course
        if(req.user.role !== "faculty"){
            return res.status(403).json({
                success:false,
                message:"Unauthorized to delete course"
            });
        }

        await course.deleteOne();
        return res.status(200).json({
            success:true,
            message:"Course deleted successfully"
        })

    }catch(error){
        res.status(500).json({
            success:false,
            message:"Error while deleting course",
            error:error.message
        })
         
    }
})
const getallCourseofSemester = asyncHandler(async(req,res) => {
    try{
        const {semester} = req.params;
        if(!semester){
            return res.status(400).json({
                success:false,
                message:"Semester is required"
            });
        }
        // when i enter semester it will give all the courses of that semester
        const courses = await Course.find({semester});
        return res.status(200).json({
            success:true,
            message:"Courses fetched successfully",
            courses,
        })


    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Error while fetching courses",
            error:error.message
        })


    }
})

export {createCourse , editcourse , deleteCourse , getallCourseofSemester}
