<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //List products
        Product::create([
            'name' => 'Rooikrans',
            'price' => 180,
            'quantity' => 20000,
            'description' => 'R1.80 Each',
        ]);
        Product::create([
            'name' => 'Myrtle',
            'price' => 120,
            'description' => 'R1.20 Each',
            'quantity' => 0,
        ]);
        Product::create([
            'name' => 'Black Wattle',
            'price' => 120,
            'description' => 'R1.20 Each',
            'quantity' => 20000,
        ]);
        Product::create([
            'name' => 'Bloekom',
            'price' => 120,
            'description' => 'R1.20 Each',
            'quantity' => 50000,
        ]);
    }
}
