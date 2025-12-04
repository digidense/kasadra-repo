// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { getLessonsAPI, deleteLessonAPI } from "../../../api/instructor/addCourse/addContentAPI.js";

// // ✅ Fetch lessons
// export const fetchLessons = createAsyncThunk(
//   "addContent/fetchLessons",
//   async (courseId, { rejectWithValue }) => {
//     try {
//       const data = await getLessonsAPI(courseId);
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "Failed to fetch lessons");
//     }
//   }
// );

// // ✅ Delete lesson
// export const deleteLesson = createAsyncThunk(
//   "addContent/deleteLesson",
//   async (lessonId, { rejectWithValue }) => {
//     try {
//       const data = await deleteLessonAPI(lessonId);
//       return lessonId; // return deleted lesson ID to remove from state
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "Failed to delete lesson");
//     }
//   }
// );

// const addContentSlice = createSlice({
//   name: "addContent",
//   initialState: {
//     lessons: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     resetAddContentState: (state) => {
//       state.lessons = [];
//       state.loading = false;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch
//       .addCase(fetchLessons.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchLessons.fulfilled, (state, action) => {
//         state.loading = false;
//         state.lessons = action.payload;
//       })
//       .addCase(fetchLessons.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Delete
//       .addCase(deleteLesson.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(deleteLesson.fulfilled, (state, action) => {
//         state.loading = false;
//         state.lessons = state.lessons.filter(
//           (lesson) => lesson.lesson_id !== action.payload
//         );
//       })

//       .addCase(deleteLesson.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
// },
// });

// export const { resetAddContentState } = addContentSlice.actions;
// export default addContentSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getLessonsAPI,
  deleteLessonAPI,
  activateLessonAPI,
  getBatchesAPI,
} from "../../../api/instructor/addCourse/addContentAPI";

// Fetch lessons
// Fetch lessons by batch
export const fetchLessons = createAsyncThunk(
  "addContent/fetchLessons",
  async (batchId, { rejectWithValue }) => {
    try {
      return await getLessonsAPI(batchId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// Fetch batches
export const fetchBatches = createAsyncThunk(
  "addContent/fetchBatches",
  async (courseId, { rejectWithValue }) => {
    try {
      return await getBatchesAPI(courseId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete lesson
export const deleteLesson = createAsyncThunk(
  "addContent/deleteLesson",
  async (lessonId, { rejectWithValue }) => {
    try {
      return await deleteLessonAPI(lessonId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Activate lesson — only batch_id
export const activateLesson = createAsyncThunk(
  "addContent/activateLesson",
  async ({ lessonId, batchId }, { rejectWithValue }) => {
    try {
      return await activateLessonAPI(lessonId, batchId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const addContentSlice = createSlice({
  name: "addContent",
  initialState: {
    lessons: [],
    batches: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLessons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLessons.fulfilled, (state, action) => {
        state.loading = false;
        state.lessons = action.payload;
      })
      .addCase(fetchLessons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchBatches.fulfilled, (state, action) => {
        state.batches = action.payload;
      })

      .addCase(deleteLesson.fulfilled, (state, action) => {
        state.lessons = state.lessons.filter(
          (l) => l.lesson_id !== action.payload.lesson_id
        );
      })

      .addCase(activateLesson.fulfilled, (state, action) => {
        // Optional — frontend already handles UI update
      });
  },
});

export default addContentSlice.reducer;
