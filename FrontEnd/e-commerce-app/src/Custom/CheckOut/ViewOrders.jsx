import React from "react";
function ViewOrders({ data }) {
  console.log("data", data);
  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    return date.toLocaleString("en-US", options);
  };
  return (
    <div className="w-full h-full bg-white">
      <table className="w-full">
        <thead className="bg-orange-400 text-white">
          <tr>
            <th className="px-6 py-3 uppercase text-left text-sm font-semibold ">
              Order ID
            </th>
            <th className="px-6 py-3 uppercase text-left text-sm font-semibold ">
              Status
            </th>

            <th className="px-6 py-3 uppercase text-left text-sm font-semibold ">
              Order Date
            </th>
            <th className="px-6 py-3 uppercase text-left text-sm font-semibold ">
              Total Price
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => (
            <tr key={order._id}>
              <td className="px-6 py-3 uppercase font-semibold text-left text-sm ">
                {order._id}
              </td>
              <td
                className={`px-6 py-3 uppercase font-semibold text-left text-sm ${
                  order.status === "Delivered"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {order.status}
              </td>
              <td className="px-6 py-3 uppercase font-semibold text-left text-sm ">
                {formatDate(new Date(order.placedDate))}
              </td>
              <td className="px-6 py-3 uppercase font-semibold text-left text-sm ">
                $ {order.totalPrice}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewOrders;
