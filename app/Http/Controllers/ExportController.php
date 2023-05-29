<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Exports\UserExports;
use Maatwebsite\Excel\Facades\Excel;
use App\Models\User;

class ExportController extends Controller
{
    // @return \Illuminate\Support\Collection

    public function index()
    {
        $users = User::get();

        return view('users', compact('users'));
    }

    public function export()
    {
        return Excel::download(new UsersExport, 'users.xlsx');
    }
}
