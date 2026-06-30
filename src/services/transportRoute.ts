import { apiConnector }
from "./apiConnecter";

// =====================================
// CREATE
// =====================================

export const createTransportRoute =
async (
  data: any
) => {

  return apiConnector(

    "POST",

    "/transport-routes",

    data
  );
};

// =====================================
// GET ALL
// =====================================

export const getTransportRoutes =
async () => {

  return apiConnector(

    "GET",

    "/transport-routes"
  );
};

// =====================================
// GET ONE
// =====================================

export const getOneTransportRoute =
async (
  id: number
) => {

  return apiConnector(

    "GET",

    `/transport-routes/${id}`
  );
};

// =====================================
// UPDATE
// =====================================

export const updateTransportRoute =
async (
  id: any,
  data: any
) => {

  return apiConnector(

    "PUT",

    `/transport-routes/${id}`,

    data
  );
};

// =====================================
// DELETE
// =====================================

export const deleteTransportRoute =
async (
  id: number
) => {

  return apiConnector(

    "DELETE",

    `/transport-routes/${id}`
  );
};

// =====================================
// TOGGLE
// =====================================

export const toggleTransportRoute =
async (
  id: number,
  isActive: boolean
) => {

  return apiConnector(

    "PATCH",

    `/transport-routes/toggle/${id}`,

    {
      isActive,
    }
  );
};