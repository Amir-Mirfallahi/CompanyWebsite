import { useState } from "react";

export default function ContactForm({ fields }) {
    const [formData, setFormData] = useState({});
    const [status, setStatus] = useState({
        submitting: false,
        success: false,
        error: null
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate that required fields are filled
        const missingRequiredFields = Object.entries(fields)
            .filter(([key, field]) => field.required && !formData[key])
            .map(([_, field]) => field.label);

        if (missingRequiredFields.length > 0) {
            setStatus({
                submitting: false,
                success: false,
                error: `لطفا فیلدهای ضروری را تکمیل کنید: ${missingRequiredFields.join(', ')}`
            });
            return;
        }

        setStatus({ submitting: true, success: false, error: null });

        try {
            // Send form data to backend API
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'خطا در ارسال فرم');
            }

            // Clear form on success
            setFormData({});
            setStatus({
                submitting: false,
                success: true,
                error: null
            });

            // Reset success message after 5 seconds
            setTimeout(() => {
                setStatus(prev => ({ ...prev, success: false }));
            }, 5000);

        } catch (error) {
            setStatus({
                submitting: false,
                success: false,
                error: error.message || 'خطا در ارسال فرم'
            });
        }
    };

    return (
        <div className="p-8 bg-white shadow-lg rounded-xl">
            <h2 className="mb-6 text-2xl font-bold text-blue-900">فرم تماس</h2>

            {status.success && (
                <div className="p-4 mb-6 text-green-800 bg-green-100 rounded-lg">
                    پیام شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت.
                </div>
            )}

            {status.error && (
                <div className="p-4 mb-6 text-red-800 bg-red-100 rounded-lg">
                    {status.error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {Object.entries(fields).map(([key, field]) => (
                    <div key={key}>
                        <label className="block mb-2 text-gray-700">
                            {field.label}
                            {field.required && <span className="text-red-500">*</span>}
                        </label>
                        {field.type === 'textarea' ? (
                            <textarea
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                rows="4"
                                required={field.required}
                                value={formData[key] || ''}
                                onChange={(e) => setFormData({...formData, [key]: e.target.value})}
                            />
                        ) : field.type === 'select' ? (
                            <select
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required={field.required}
                                value={formData[key] || ''}
                                onChange={(e) => setFormData({...formData, [key]: e.target.value})}
                            >
                                <option value="">انتخاب کنید</option>
                                {field.options.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <input
                                type={field.type}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required={field.required}
                                value={formData[key] || ''}
                                onChange={(e) => setFormData({...formData, [key]: e.target.value})}
                            />
                        )}
                    </div>
                ))}
                <button
                    type="submit"
                    disabled={status.submitting}
                    className={`w-full ${status.submitting ? 'bg-blue-700' : 'bg-blue-900'} text-white py-3 rounded-lg hover:bg-blue-800 transition-colors flex justify-center items-center`}
                >
                    {status.submitting ? (
                        <>
                            <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            در حال ارسال...
                        </>
                    ) : (
                        'ارسال پیام'
                    )}
                </button>
            </form>
        </div>
    );
}
