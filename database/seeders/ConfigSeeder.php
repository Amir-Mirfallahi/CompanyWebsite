<?php

namespace Database\Seeders;

use App\Models\Config;
use Illuminate\Database\Seeder;

class ConfigSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Check if a config already exists
        $config = Config::first();

        if ($config) {
            // Update existing config with statistics data
            $config->update([
                'statistics' => [
                    [
                        'title' => 'سال تجربه',
                        'value' => '15',
                        'suffix' => '+',
                        'icon' => 'calendar'
                    ],
                    [
                        'title' => 'پروژه موفق',
                        'value' => '1250',
                        'suffix' => '+',
                        'icon' => 'clipboard-check'
                    ],
                    [
                        'title' => 'مشتریان راضی',
                        'value' => '98',
                        'suffix' => '%',
                        'icon' => 'users'
                    ],
                    [
                        'title' => 'محصول',
                        'value' => '300',
                        'suffix' => '+',
                        'icon' => 'cube'
                    ]
                ]
            ]);

            $this->command->info('Statistics data added to existing Config.');
        } else {
            $this->command->warn('No Config record found. Please create a Config record first.');
        }
    }
}
