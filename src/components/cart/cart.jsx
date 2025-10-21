import React, { useContext } from "react";
import { CartContext } from "../../components/cartContext/cartContext";

export default function Cart() {
  
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const total = Array.isArray(cart)
    ? cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
    : 0;

  if (!cart || cart.length === 0) {
    return (
      <h2 className="text-center mt-10 text-xl text-gray-700">
        سلتك فاضية 😅
      </h2>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">🛍 سلة المشتريات</h1>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-center justify-between border p-4 rounded-xl shadow-sm bg-gray-100"
          >
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <img
                src={item.thumbnail || item.image}
                alt={item.title}
                className="w-20 h-20 object-contain bg-white p-2 rounded-lg"
              />
              <div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-gray-700">السعر: ${item.price}</p>
                <p className="text-gray-700">الكمية: {item.quantity}</p>
              </div>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="mt-3 sm:mt-0 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              حذف
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col sm:flex-row justify-between items-center border-t pt-4">
        <h2 className="text-xl font-bold text-gray-800">
          الإجمالي: ${total.toFixed(2)}
        </h2>
        <button
          onClick={clearCart}
          className="mt-3 sm:mt-0 bg-gray-800 text-white px-5 py-2 rounded-lg hover:bg-gray-900 transition"
        >
          تفريغ السلة
        </button>
      </div>
    </div>
  );
}
