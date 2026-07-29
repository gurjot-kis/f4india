import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create() {

    const { data, setData, post, processing, errors } = useForm({
        description: '',
        status: true,
    });

    const submit = (e) => {
        e.preventDefault();

        post('/dashboard/notices');
    };

    return (
        <>
            <Head title="Add Notice" />

            <div className="p-6 max-w-2xl">

                <h1 className="text-2xl font-bold mb-6">
                    Add Notice
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
                                setData(
                                    'description',
                                    e.target.value
                                )
                            }
                            className="border rounded w-full px-4 py-2"
                            placeholder="Enter notice"
                            maxLength="255"
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

                    </div>

                    <div className="flex gap-3">

                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-5 py-2 rounded"
                        >
                            {processing
                                ? 'Saving...'
                                : 'Save Notice'}
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