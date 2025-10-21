// ProfilePage.react.jsx
// ملاحظة: هذه صفحة React جاهزة للاستعمال مع Tailwind CSS.
// قم بإضافتها لمشروعك (مثلاً src/components/ProfilePage.jsx) واستوردها في صفحة البروفايل.
// تخزن البيانات في localStorage باسم 'userProfile' وتعرض صورة المستخدم (preview) عند رفعها.

import React, { useState, useEffect, useRef } from 'react';

export default function Profile({ initialData = null }) {
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const fileInputRef = useRef(null);

    const empty = {
        name: '',
        email: '',
        phone: '',
        dob: '',
        bio: '',
        avatarDataUrl: ''
    };

    const [user, setUser] = useState(empty);

    useEffect(() => {
        try {
            const saved = localStorage.getItem('userProfile');
            if (saved) {
                setUser(JSON.parse(saved));
            } else if (initialData) {
                setUser({ ...empty, ...initialData });
            }
        } catch (e) {
            console.error('failed reading localStorage', e);
        }
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validatePhone(phone) {
        // بسيط: يقبل أرقام ومسافات و+ و- و() فقط
        return /^[0-9()+\s-]{7,20}$/.test(phone);
    }

    async function handleSave() {
        // تحقق بسيط
        if (!user.name.trim()) return alert('اكتب اسمك!');
        if (user.email && !validateEmail(user.email)) return alert('ايميل مش صحيح');
        if (user.phone && !validatePhone(user.phone)) return alert('رقم تليفون مش صحيح');

        setSaving(true);
        try {
            localStorage.setItem('userProfile', JSON.stringify(user));
            // محاكاة تأخير بسيط
            await new Promise(r => setTimeout(r, 300));
            setEditing(false);
        } catch (e) {
            console.error(e);
            alert('حصل خطأ في الحفظ');
        } finally {
            setSaving(false);
        }
    }

    function handleAvatarChange(e) {
        const f = e.target.files && e.target.files[0];
        if (!f) return;
        const reader = new FileReader();
        reader.onload = () => {
            setUser(prev => ({ ...prev, avatarDataUrl: reader.result }));
        };
        reader.readAsDataURL(f);
    }

    function handleRemoveAvatar() {
        setUser(prev => ({ ...prev, avatarDataUrl: '' }));
        if (fileInputRef.current) fileInputRef.current.value = null;
    }

    function handleReset() {
        if (!confirm('هل أنت متأكد أنك عايز تمسح بيانات البروفايل؟')) return;
        localStorage.removeItem('userProfile');
        setUser(empty);
    }



    return <>

        <div className='bg-gray-700 h-[700px]'>

            <div className="max-w-4xl mx-auto  mt-14 p-6">

                <div className="flex items-center gap-6">

                    <div className="w-28 h-28 bg-gray-100 rounded-full overflow-hidden flex-shrink-0 shadow">
                        {user.avatarDataUrl ? (
                            <img src={user.avatarDataUrl} alt="avatar" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 20v-1a4 4 0 014-4h4a4 4 0 014 4v1" />
                                </svg>
                            </div>
                        )}
                    </div>

                    <div className="flex-1">
                        <h1 className="text-2xl text-white font-semibold">{user.name || ' User Name '}</h1>
                        <p className="text-sm text-gray-300">{user.email || ' No registered email '}</p>
                        <div className="mt-3 flex gap-2">
                            <button onClick={() => setEditing(true)} className="px-3 py-1 rounded bg-blue-600 text-white text-sm">تعديل البروفايل</button>
                            <button onClick={handleReset} className="px-3 py-1 rounded bg-red-600 text-white  text-sm">مسح البيانات</button>
                        </div>
                    </div>
                </div>

                <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
                    {!editing ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-sm text-gray-600">Name</h3>
                                <p className="mt-1 text-lg">{user.name || '-'}</p>
                            </div>
                            <div>
                                <h3 className="text-sm text-gray-600">Email</h3>
                                <p className="mt-1 text-lg">{user.email || '-'}</p>
                            </div>
                            <div>
                                <h3 className="text-sm text-gray-600">Phone number </h3>
                                <p className="mt-1 text-lg">{user.phone || '-'}</p>
                            </div>
                            <div>
                                <h3 className="text-sm text-gray-600">date of birth</h3>
                                <p className="mt-1 text-lg">{user.dob || '-'}</p>
                            </div>
                            <div className="md:col-span-2">
                                <h3 className="text-sm text-gray-600">About</h3>
                                <p className="mt-1 text-lg whitespace-pre-wrap">{user.bio || '-'}</p>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-600">الاسم</label>
                                    <input name="name" value={user.name} onChange={handleChange} className="mt-1 w-full rounded border px-3 py-2" />
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-600">الايميل</label>
                                    <input name="email" value={user.email} onChange={handleChange} className="mt-1 w-full rounded border px-3 py-2" />
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-600">رقم التليفون</label>
                                    <input name="phone" value={user.phone} onChange={handleChange} className="mt-1 w-full rounded border px-3 py-2" />
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-600">تاريخ الميلاد</label>
                                    <input name="dob" value={user.dob} onChange={handleChange} type="date" className="mt-1 w-full rounded border px-3 py-2" />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm text-gray-600">نبذة قصيرة</label>
                                    <textarea name="bio" value={user.bio} onChange={handleChange} rows={4} className="mt-1 w-full rounded border px-3 py-2" />
                                </div>

                                <div className="md:col-span-2 flex items-center gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-600">صورة البروفايل</label>
                                        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarChange} className="mt-1" />
                                    </div>

                                    {user.avatarDataUrl && (
                                        <div className="flex items-center gap-2">
                                            <img src={user.avatarDataUrl} alt="preview" className="w-20 h-20 object-cover rounded" />
                                            <button onClick={handleRemoveAvatar} className="px-2 py-1 rounded bg-red-100 text-red-700 text-sm">حذف</button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mt-4 flex gap-2">
                                <button onClick={handleSave} disabled={saving} className="px-3 py-2 rounded bg-green-600 text-white">{saving ? 'جاري الحفظ...' : 'حفظ'}</button>
                                <button onClick={() => setEditing(false)} className="px-3 py-2 rounded bg-gray-100">إلغاء</button>
                            </div>
                        </div>
                    )}
                </div>

            </div>

        </div>

    </>
}
