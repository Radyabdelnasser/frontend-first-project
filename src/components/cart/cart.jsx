




import React, { useContext } from "react";
import { CartContext } from "../../components/cartContext/cartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = Array.isArray(cart)
    ? cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
    : 0;

  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-700">
        <h2 className="text-center text-2xl text-white bg-slate-900 px-8 py-6 rounded-2xl shadow-lg">
          سلتك فاضية 😅
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-700 text-white flex flex-col items-center mt-10 py-10 px-4">
      <div className="w-full max-w-5xl bg-slate-900 rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-semibold mb-8 text-center">🛍 سلة المشتريات</h1>

        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center justify-between border border-slate-700 bg-slate-800 p-5 rounded-xl hover:border-blue-500 transition duration-300"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={item.thumbnail || item.image}
                  alt={item.title}
                  className="w-24 h-24 object-contain bg-white p-2 rounded-lg"
                />
                <div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-gray-300">السعر: ${item.price}</p>
                  <p className="text-gray-300">الكمية: {item.quantity}</p>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="mt-4 sm:mt-0 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition duration-300"
              >
                حذف
              </button>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-slate-600 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-2xl font-bold">
            الإجمالي: ${total.toFixed(2)}
          </h2>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate("/checkout")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition duration-300"
            >
              Proceed to Checkout
            </button>

            <button
              onClick={clearCart}
              className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-md transition duration-300"
            >
              تفريغ السلة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
