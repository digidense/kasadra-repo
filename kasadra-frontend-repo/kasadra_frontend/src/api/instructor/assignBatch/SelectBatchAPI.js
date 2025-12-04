
import api from "../../axiosInstance.js";
// ---------------------------------------
// ASSIGN Students to Batch  (POST)
// ---------------------------------------
export const assignStudentsToBatchAPI = async ({ batchId, studentIds }) => {
    try {
        const response = await api.post(`/batches/assign`,
            { batch_id: batchId, student_ids: studentIds },
            { headers: { "X-Role": "instructor" } }
        );

        return response.data;
    } catch (err) {
        console.error("assignStudentsToBatchAPI error:", err);

        // Extract backend message properly
        const message =
            err.response?.data?.detail ||
            err.response?.data?.message ||
            err.message;

        // Pass full error object back to thunk
        return Promise.reject({
            response: { data: { detail: message } }
        });
    }

};


// ----------------------
// MOVE Students to Batch
// ----------------------

export const moveStudentsAPI = async (studentIds, batchId) => {
    try {
        const response = await api.put(
            "/batches/update",
            {
                student_ids: studentIds,
                batch_id: batchId
            },
            {
                headers: { "X-Role": "instructor" }
            }
        );

        return response.data;

    } catch (err) {
        const message =
            err.response?.data?.message ||
            err.message ||
            "Failed to move students";

        throw new Error(message);
    }
};

