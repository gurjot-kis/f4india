import React from 'react';
import { Head, Link, router } from '@inertiajs/react';


export default function Index({ notices, filters }) {

    const handleSearch = (e) => {
        e.preventDefault();

        const search = e.target.search.value;

        router.get(
            '/dashboard/notices',
            { search },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    // const deleteNotice = (id) => {
    //     if (confirm('Are you sure you want to delete this notice?')) {
    //         router.delete(`/notices/${id}`);
    //     }
    // };

    const deleteNotice = (id) => {
        if (confirm('Are you sure you want to delete this notice?')) {
            router.delete(`/dashboard/notices/${id}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <>
            <Head title="Notice Management" />

            <div className="p-6">

                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">
                        Notice Management
                    </h1>

                    <Link
                        href="/dashboard/notices/create"
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Add Notice
                    </Link>
                </div>

                <form
                    onSubmit={handleSearch}
                    className="flex gap-2 mb-6"
                >
                    <input
                        type="text"
                        name="search"
                        defaultValue={filters.search || ''}
                        placeholder="Search notice..."
                        className="border rounded px-4 py-2 w-80"
                    />

                    <button
                        type="submit"
                        className="bg-gray-800 text-white px-5 py-2 rounded"
                    >
                        Search
                    </button>

                    <Link
                        href="/dashboard/notices"
                        className="border px-5 py-2 rounded"
                    >
                        Reset
                    </Link>
                </form>

                <div className="bg-white shadow rounded overflow-hidden">

                    <table className="w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="text-left p-4">
                                    #
                                </th>

                                <th className="text-left p-4">
                                    Description
                                </th>

                                <th className="text-left p-4">
                                    Status
                                </th>

                                <th className="text-left p-4">
                                    Created At
                                </th>

                                <th className="text-left p-4">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {notices.data.length > 0 ? (
                                notices.data.map((notice, index) => (
                                    <tr
                                        key={notice.id}
                                        className="border-t"
                                    >
                                        <td className="p-4">
                                            {notices.from + index}
                                        </td>

                                        <td className="p-4">
                                            {notice.description}
                                        </td>

                                        <td className="p-4">
                                            {notice.status ? (
                                                <span className="text-green-600">
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="text-red-600">
                                                    Inactive
                                                </span>
                                            )}
                                        </td>

                                        <td className="p-4">
                                            {new Date(
                                                notice.created_at
                                            ).toLocaleDateString()}
                                        </td>

                                        <td className="p-4 flex gap-2">

                                            <Link
                                                href={`/dashboard/notices/${notice.id}/edit`}
                                                className="text-blue-600"
                                            >
                                                Edit
                                            </Link>

                                            <button
                                                onClick={() =>
                                                    deleteNotice(notice.id)
                                                }
                                                className="text-red-600"
                                            >
                                                Delete
                                            </button>

                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="p-6 text-center"
                                    >
                                        No notices found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>

                {/* Pagination */}

                <div className="flex gap-2 mt-6">

                    {notices.links.map((link, index) => (
                        <button
                            key={index}
                            disabled={!link.url}
                            onClick={() =>
                                link.url &&
                                router.get(link.url, {}, {
                                    preserveState: true,
                                    preserveScroll: true,
                                })
                            }
                            dangerouslySetInnerHTML={{
                                __html: link.label,
                            }}
                            className={`px-3 py-2 border rounded ${
                                link.active
                                    ? 'bg-blue-600 text-white'
                                    : ''
                            }`}
                        />
                    ))}

                </div>

            </div>
        </>
    );
}