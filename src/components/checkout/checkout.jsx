
import React, { useContext, useState } from "react";
import { CartContext } from "../../components/cartContext/cartContext";
import toast, { Toaster } from "react-hot-toast";

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);

  // حساب المجموع الكلي
  const total = Array.isArray(cart)
    ? cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
    : 0;

  // بيانات الفورم
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    address: "",
    paymentMethod: "cash",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order submitted:", formData);
    // clearCart();
    toast.success("تم إرسال الطلب بنجاح!");

    // alert("تم إرسال الطلب بنجاح!");
  };

  return (
    <div className="min-h-screen  mt-6 flex justify-center py-10 px-4">
      <div className="w-full max-w-4xl bg-slate-500 rounded-lg  grid md:grid-cols-2 gap-3">
        {/* فورم البيانات */}
        <div className="bg-slate-400 p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-semibold mb-4">بيانات العميل</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="fullName"
              placeholder="الاسم الكامل"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="email"
              name="email"
              placeholder="البريد الإلكتروني"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="tel"
              name="phone"
              placeholder="رقم الهاتف"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="country"
                placeholder="البلد"
                value={formData.country}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="text"
                name="city"
                placeholder="المدينة"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />
            </div>
            <input
              type="text"
              name="address"
              placeholder="العنوان التفصيلي"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
            />


            <div>
              <label className="block mb-2 font-medium">طريقة الدفع:</label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              >
                <option value="cash">الدفع عند الاستلام</option>
                <option value="card">بطاقة بنكية</option>
                <option value="wallet">محفظة إلكترونية</option>
              </select>
            </div>


            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              تأكيد الطلب
            </button>
          </form>
        </div>

        {/* ملخص الطلب */}
        <div className="bg-slate-400 p-6 rounded-2xl shadow h-fit">
          <h2 className="text-2xl font-semibold mb-4">ملخص الطلب</h2>
          {cart.length === 0 ? (
            <p className="text-gray-500">السلة فارغة</p>
          ) : (
            <>
              <ul className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        الكمية: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold">
                      {item.price * item.quantity} ج.م
                    </p>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between text-lg font-semibold border-t pt-3">
                <span>الإجمالي:</span>
                <span>{total.toFixed(2)} ج.م</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
