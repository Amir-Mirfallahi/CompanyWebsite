<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create a test user if it doesn't already exist
        // if (!User::where('email', 'test@example.com')->exists()) {
        //     User::factory()->create([
        //         'name' => 'Test User',
        //         'email' => 'test@example.com',
        //     ]);
        // }

        // Run the ProductSeeder to create categories and products
        $this->call([
            ProductSeeder::class,
            ConfigSeeder::class,
        ]);
    }
}
