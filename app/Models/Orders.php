<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;

class Orders extends Model
{
    use HasFactory;

    protected $fillable = [
        'product',
        'qty',
        'option',
        'orderNo',
        'userId',
        'price',
        'fee',
        'date',
    ];

    public function product (){
        return $this->hasMany(Product::class);
    }
}
