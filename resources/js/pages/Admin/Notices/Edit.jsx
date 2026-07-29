import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ notice }) {
    const {
        data,
        setData,
        put,
        processing,
        errors,
    } = useForm({
        description: notice.description || '',
        status: Boolean(notice.status),
    });

    const submit = (e) => {
        e.preventDefault();

        put(`/dashboard/notices/${notice.id}`, {
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title="Edit Notice" />

            <div className="p-6 max-w-2xl">
                <h1 className="text-2xl font-bold mb-6">
                    Edit Notice
                </h1>

                <form
                    onSubmit={submit}
                    className="bg-white shadow rounded p-6"
                >
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">
                            Description
                        </label>

                        <input
                            type="text"
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                            className="border rounded w-full px-4 py-2"
                            maxLength={255}
                        />

                        {errors.description && (
                            <div className="text-red-600 mt-1">
                                {errors.description}
                            </div>
                        )}
                    </div>

                    <div className="mb-6">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={data.status}
                                onChange={(e) =>
                                    setData(
                                        'status',
                                        e.target.checked
                                    )
                                }
                            />

                            Active
                        </label>

                        {errors.status && (
                            <div className="text-red-600 mt-1">
                                {errors.status}
                            </div>
                        )}
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-5 py-2 rounded disabled:opacity-50"
                        >
                            {processing
                                ? 'Updating...'
                                : 'Update Notice'}
                        </button>

                        <Link
                            href="/dashboard/notices"
                            className="border px-5 py-2 rounded"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
}