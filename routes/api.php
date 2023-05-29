<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Product;
use App\Models\Orders;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/users/create', function(Request $request){
    $data = $request->all();

    if(!User::where('phone', '=', $data['phone'])->exists()){
        $user = User::create([
            "name" => $data["name"],
            "phone" => $data["phone"],
            "address" => $data["address"],
        ]);

        if(empty($user->id)){
            return [
                "success" => false,
                "resonse" => [
                    "error" => "An unusual error has occured"
                ]
            ];
        } else {
            return [
                "success" => true,
                "response" => [
                    "user" => $user
                ]
            ];
        }
    } else {
        return [
            "success" => false,
            "response" => [
                "error" => "The user already exists"
            ]
        ];
    }
});
Route::get('/users/all', function() {
    $users = User::all();

    if(empty($users)) {
        return [
            "success" => false,
            "response" => [
                "error" => "No users found"
            ]
        ];
    }

    return [
        "success" => true,
        "response" => [
            "user" => $users
        ]
    ];
});

Route::get('/users/{id}', function(Request $request, $id) {
    $user = User::find($id);
 
    if(empty($user)) {
        return [
            "success" => false,
            "response" => [
                "error" => "User not found"
            ]
        ];
    }

    return [
        "success" => true,
        "response" => [
            "user" => $user
        ]
    ];

});

Route::delete('/users/delete/{id}', function(Request $request, $id) {
    $user = User::find($id);

    if(empty($user)) {
        $success = false;
        $response = ["error" => "No such user."];
    } else {
        $success = $user->delete();
        $response = ["message" => "User deleted."];
    }

    return ["success" => $success, "response" => $response];
});

Route::put('/users/update/{id}', function(Request $request, $id){
    $data = $request->all();

    $user = User::find($id);

    foreach($data as $key => $value) {
        $user->{$key} = $value;
    }

    $result = $user->save();

    return["success" => $result, "response" => ["user" => $user]];
});

// --Product inventory api section--

Route::post('/products/create', function(Request $request){
    $data = $request->all();

    if(!Product::where('name', '=', $data['name'])->exists()){
        $product = Product::create([
            "name" => $data["name"],
            "price" => $data["price"],
            "description" => $data["description"],
            "quantity" => $data["quantity"],
        ]);

        if(empty($product->id)){
            return [
                "success" => false,
                "resonse" => [
                    "error" => "An unusual error has occured"
                ]
            ];
        } else {
            return [
                "success" => true,
                "response" => [
                    "product" => $product
                ]
            ];
        }
    } else {
        return [
            "success" => false,
            "response" => [
                "error" => "The inventory item already exists"
            ]
        ];
    }
});

Route::get('/products/all', function() {
    $product = Product::all();

    if(empty($product)) {
        return [
            "success" => false,
            "response" => [
                "error" => "No inventory items found"
            ]
        ];
    }

    return [
        "success" => true,
        "response" => [
            "products" => $product
        ]
    ];
});

Route::put('/products/update/{id}', function(Request $request, $id){
    $data = $request->all();

    $product = Product::find($id);

    foreach($data as $key => $value) {
        $product->{$key} = $value;
    }

    $result = $product->save();

    return["success" => $result, "response" => ["product" => $product]];
});

Route::delete('/products/delete/{id}', function(Request $request, $id) {
    $product = Product::find($id);

    if(empty($product)) {
        $success = false;
        $response = ["error" => "No such user."];
    } else {
        $success = $product->delete();
        $response = ["message" => "User deleted."];
    }

    return ["success" => $success, "response" => $response];
});

Route::get('/products/{id}', function(Request $request, $id) {
    $product = Product::find($id);
 
    if(empty($product)) {
        return [
            "success" => false,
            "response" => [
                "error" => "Product record not found"
            ]
        ];
    }

    return [
        "success" => true,
        "response" => [
            "product" => $product
        ]
    ];

});

// --Orders API section--

Route::get('/orders/all', function(){
    $orders = DB::table('orders')->get();

    return response()->json([
        'orders' => $orders
    ]);
});


//Exporting database section
Route::get('/export/all', function(){
    return Excel::download(new DataExport($data), $filename);
});
