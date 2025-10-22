import React, { useState, useEffect, useRef } from "react";

export default function Profile() {
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const fileInputRef = useRef(null);

    const empty = {
        name: "",
        email: "",
        phone: "",
        dob: "",
        bio: "",
        avatarDataUrl: "",
    };

    const [user, setUser] = useState(empty);

    // Load data from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("userProfile");
        if (saved) setUser(JSON.parse(saved));
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSave() {
        if (!user.name.trim()) return alert("Please enter your name!");
        setSaving(true);
        try {
            localStorage.setItem("userProfile", JSON.stringify(user));
            await new Promise((r) => setTimeout(r, 400));
            setEditing(false);
        } finally {
            setSaving(false);
        }
    }

    function handleAvatarChange(e) {
        const f = e.target.files && e.target.files[0];
        if (!f) return;
        const reader = new FileReader();
        reader.onload = () =>
            setUser((prev) => ({ ...prev, avatarDataUrl: reader.result }));
        reader.readAsDataURL(f);
    }

    function handleRemoveAvatar() {
        setUser((prev) => ({ ...prev, avatarDataUrl: "" }));
        if (fileInputRef.current) fileInputRef.current.value = null;
    }

    function handleReset() {
        if (!confirm("Are you sure you want to delete your profile data?")) return;
        localStorage.removeItem("userProfile");
        setUser(empty);
    }

    return (
        <div className="min-h-screen bg-gray-900 flex justify-center items-start pt-10 px-4 mt-10 sm:px-6">
            <div className="bg-gray-800 text-white w-full max-w-3xl rounded-2xl shadow-xl p-6 sm:p-8 mb-10">
                {/* Top Section */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-gray-700 pb-6">
                    <div className="relative w-28 h-28 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center">
                        {user.avatarDataUrl ? (
                            <img
                                src={user.avatarDataUrl}
                                alt="avatar"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-12 h-12 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M12 12c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 
                    1.8-4 4 1.8 4 4 4zM6 20v-1a4 
                    4 0 014-4h4a4 4 0 014 4v1"
                                />
                            </svg>
                        )}
                    </div>

                    <div className="flex-1 text-center sm:text-left">
                        <h1 className="text-2xl font-semibold">{user.name || "User Name"}</h1>
                        <p className="text-gray-400 text-sm mt-1">
                            {user.email || "No registered email"}
                        </p>

                        <div className="mt-3 flex justify-center sm:justify-start gap-3">
                            <button
                                onClick={() => setEditing(true)}
                                className="bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded text-sm"
                            >
                                Edit Profile
                            </button>
                            <button
                                onClick={handleReset}
                                className="bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded text-sm"
                            >
                                Clear Data
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="mt-6">
                    {!editing ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Info label="Name" value={user.name} />
                            <Info label="Email" value={user.email} />
                            <Info label="Phone" value={user.phone} />
                            <Info label="Date of Birth" value={user.dob} />
                            <div className="sm:col-span-2">
                                <Info label="About" value={user.bio} />
                            </div>
                        </div>
                    ) : (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSave();
                            }}
                            className="space-y-4"
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Input label="Name" name="name" value={user.name} onChange={handleChange} />
                                <Input label="Email" name="email" value={user.email} onChange={handleChange} />
                                <Input label="Phone" name="phone" value={user.phone} onChange={handleChange} />
                                <Input
                                    label="Date of Birth"
                                    type="date"
                                    name="dob"
                                    value={user.dob}
                                    onChange={handleChange}
                                />
                                <div className="sm:col-span-2">
                                    <label className="block text-sm text-gray-300 mb-1">About</label>
                                    <textarea
                                        name="bio"
                                        value={user.bio}
                                        onChange={handleChange}
                                        rows="4"
                                        className="w-full rounded-lg bg-gray-700 border border-gray-600 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* Avatar Upload */}
                                <div className="sm:col-span-2 flex flex-col sm:flex-row items-center gap-4">
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleAvatarChange}
                                        className="text-sm"
                                    />
                                    {user.avatarDataUrl && (
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={user.avatarDataUrl}
                                                alt="preview"
                                                className="w-20 h-20 object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleRemoveAvatar}
                                                className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded text-sm"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
                                >
                                    {saving ? "Saving..." : "Save"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEditing(false)}
                                    className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

// Small components for clarity
function Info({ label, value }) {
    return (
        <div>
            <h3 className="text-sm text-gray-400">{label}</h3>
            <p className="mt-1 text-lg text-white">{value || "-"}</p>
        </div>
    );
}

function Input({ label, name, value, onChange, type = "text" }) {
    return (
        <div>
            <label className="block text-sm text-gray-300 mb-1">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full rounded-lg bg-gray-700 border border-gray-600 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
}
