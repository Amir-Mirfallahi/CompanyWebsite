<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\Spec;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Check if we already have a significant number of products
        if (Product::count() >= 200) {
            $this->command->info('Database already has at least 200 products. Skipping product seeding.');
            return;
        }

        // Clear existing data if there are fewer than 200 products
        // This ensures we don't end up with duplicates or partial data
        if (Product::count() > 0) {
            $this->command->info('Clearing existing products, categories, and specs...');

            // For SQLite, we don't need to disable foreign key checks if cascade deletes are set up
            // Delete in the correct order to respect foreign key constraints
            DB::table('product_spec')->delete();
            Product::query()->delete();
            Spec::query()->delete();
            Category::query()->delete();
        }

        // Create categories
        $categories = [
            ['name' => 'دستگاه‌های تهویه مطبوع'],
            ['name' => 'پنل‌های خورشیدی'],
            ['name' => 'تجهیزات صنعتی'],
            ['name' => 'سیستم‌های صوتی'],
            ['name' => 'لوازم الکترونیکی'],
        ];

        $this->command->info('Creating categories...');
        $categoryIds = [];
        foreach ($categories as $category) {
            $categoryIds[] = Category::create($category)->id;
        }

        // Create common specifications
        $this->command->info('Creating specifications...');
        $commonSpecs = [
            // Electrical specs
            ['key' => 'ولتاژ', 'value' => '220V'],
            ['key' => 'ولتاژ', 'value' => '110V'],
            ['key' => 'فرکانس', 'value' => '50Hz'],
            ['key' => 'فرکانس', 'value' => '60Hz'],
            ['key' => 'توان مصرفی', 'value' => '500W'],
            ['key' => 'توان مصرفی', 'value' => '1000W'],
            ['key' => 'توان مصرفی', 'value' => '1500W'],
            ['key' => 'توان مصرفی', 'value' => '2000W'],

            // Physical specs
            ['key' => 'وزن', 'value' => '10 کیلوگرم'],
            ['key' => 'وزن', 'value' => '15 کیلوگرم'],
            ['key' => 'وزن', 'value' => '20 کیلوگرم'],
            ['key' => 'ابعاد', 'value' => '50x30x20 سانتی‌متر'],
            ['key' => 'ابعاد', 'value' => '60x40x25 سانتی‌متر'],
            ['key' => 'ابعاد', 'value' => '80x50x30 سانتی‌متر'],

            // Efficiency specs
            ['key' => 'بازده', 'value' => '85%'],
            ['key' => 'بازده', 'value' => '90%'],
            ['key' => 'بازده', 'value' => '95%'],

            // Other specs
            ['key' => 'گارانتی', 'value' => '1 سال'],
            ['key' => 'گارانتی', 'value' => '2 سال'],
            ['key' => 'گارانتی', 'value' => '3 سال'],
            ['key' => 'کشور سازنده', 'value' => 'ایران'],
            ['key' => 'کشور سازنده', 'value' => 'آلمان'],
            ['key' => 'کشور سازنده', 'value' => 'چین'],
            ['key' => 'کشور سازنده', 'value' => 'ژاپن'],
        ];

        $specIds = [];
        foreach ($commonSpecs as $spec) {
            $specIds[] = Spec::create($spec)->id;
        }

        // Sample product names for each category
        $productNames = [
            // HVAC products
            0 => [
                'کولر گازی اسپلیت',
                'کولر گازی پرتابل',
                'داکت اسپلیت',
                'فن کویل',
                'چیلر',
                'هواساز',
                'ایرواشر',
                'دستگاه تهویه مطبوع صنعتی',
                'دستگاه تصفیه هوا',
                'بخاری برقی',
                'فن سقفی',
                'فن دیواری',
                'کولر آبی',
                'هواکش'
            ],
            // Solar products
            1 => [
                'پنل خورشیدی مونوکریستال',
                'پنل خورشیدی پلی‌کریستال',
                'اینورتر خورشیدی',
                'شارژ کنترلر خورشیدی',
                'باتری خورشیدی',
                'چراغ خورشیدی',
                'پمپ آب خورشیدی',
                'سیستم برق خورشیدی خانگی',
                'سیستم آبگرمکن خورشیدی'
            ],
            // Industrial products
            2 => [
                'کمپرسور هوا',
                'پمپ صنعتی',
                'موتور الکتریکی',
                'مبدل حرارتی',
                'مخزن تحت فشار',
                'الکتروموتور',
                'دیزل ژنراتور',
                'ترانسفورماتور',
                'دستگاه جوش',
                'دریل صنعتی',
                'دستگاه تراش',
                'دستگاه برش',
                'دستگاه پرس',
                'لیفتراک'
            ],
            // Audio systems
            3 => [
                'اسپیکر بلوتوثی',
                'ساندبار',
                'آمپلی‌فایر',
                'میکسر صدا',
                'میکروفون استودیویی',
                'هدفون استودیویی',
                'سیستم صوتی خانگی',
                'سیستم صوتی خودرو',
                'اکولایزر'
            ],
            // Electronics
            4 => [
                'تلویزیون',
                'لپ‌تاپ',
                'تبلت',
                'موبایل',
                'مانیتور کامپیوتر',
                'پرینتر',
                'اسکنر',
                'دوربین عکاسی',
                'دوربین فیلمبرداری',
                'کنسول بازی',
                'ساعت هوشمند',
                'مودم',
                'روتر',
                'هارد اکسترنال'
            ],
        ];

        // Sample prices
        $prices = [
            '۹,۵۰۰,۰۰۰ تومان',
            '۱۲,۸۰۰,۰۰۰ تومان',
            '۱۵,۶۰۰,۰۰۰ تومان',
            '۱۸,۹۰۰,۰۰۰ تومان',
            '۲۲,۵۰۰,۰۰۰ تومان',
            '۲۷,۶۰۰,۰۰۰ تومان',
            '۳۲,۸۰۰,۰۰۰ تومان',
            '۳۸,۴۰۰,۰۰۰ تومان',
            '۴۲,۹۰۰,۰۰۰ تومان',
            '۵۵,۰۰۰,۰۰۰ تومان',
            '۶۸,۰۰۰,۰۰۰ تومان',
            '۷۴,۵۰۰,۰۰۰ تومان'
        ];

        // Sample old prices (higher than regular prices)
        $oldPrices = [
            '۱۲,۵۰۰,۰۰۰ تومان',
            '۱۶,۹۰۰,۰۰۰ تومان',
            '۱۹,۸۰۰,۰۰۰ تومان',
            '۲۴,۵۰۰,۰۰۰ تومان',
            '۳۰,۸۰۰,۰۰۰ تومان',
            '۳۷,۴۰۰,۰۰۰ تومان',
            '۴۴,۳۰۰,۰۰۰ تومان',
            '۵۲,۹۰۰,۰۰۰ تومان',
            '۶۱,۵۰۰,۰۰۰ تومان',
            '۶۸,۰۰۰,۰۰۰ تومان',
            '۸۵,۶۰۰,۰۰۰ تومان',
            '۹۲,۷۰۰,۰۰۰ تومان'
        ];

        // Sample description fragments to build realistic descriptions
        $descriptionFragments = [
            'با کیفیت عالی و طراحی مدرن',
            'دارای گارانتی رسمی شرکت',
            'ساخته شده با بهترین مواد اولیه',
            'مناسب برای استفاده در منازل و ادارات',
            'با قابلیت کنترل از راه دور',
            'دارای تکنولوژی پیشرفته و روز دنیا',
            'با مصرف انرژی بهینه',
            'طراحی شده برای استفاده آسان',
            'با قابلیت اتصال بی سیم',
            'قابل استفاده در شرایط مختلف آب و هوایی',
            'با ظرفیت بالا و عملکرد سریع',
            'بدنه مقاوم در برابر خوردگی و رطوبت',
            'با کارایی بالا و صدای کم',
            'دارای استانداردهای بین‌المللی',
            'با صرفه‌جویی در مصرف انرژی',
        ];

        // Sample placeholder images from placeholder.com
        $placeholderImages = [
            'https://via.placeholder.com/800x600/2563eb/ffffff?text=Product+1',
            'https://via.placeholder.com/800x600/3b82f6/ffffff?text=Product+2',
            'https://via.placeholder.com/800x600/60a5fa/ffffff?text=Product+3',
            'https://via.placeholder.com/800x600/93c5fd/ffffff?text=Product+4',
            'https://via.placeholder.com/800x600/bfdbfe/ffffff?text=Product+5',
        ];

        // Create 200 products
        $this->command->info('Creating 200 products with specifications...');
        $productCount = 200;
        $progressBar = $this->command->getOutput()->createProgressBar($productCount);
        $progressBar->start();

        for ($i = 0; $i < $productCount; $i++) {
            // Select a random category
            $categoryId = $categoryIds[array_rand($categoryIds)];
            $categoryIndex = array_search($categoryId, $categoryIds);

            // Get a product name based on the category
            $productName = $productNames[$categoryIndex][array_rand($productNames[$categoryIndex])];

            // Add some variation to the product name
            $productName .= ' ' . ['مدل A' . rand(100, 999), 'مدل B' . rand(100, 999), 'سری C' . rand(10, 99), 'پرو مدل ' . rand(2021, 2024)][array_rand([0, 1, 2, 3])];

            // Build a description from 2-3 random fragments
            $fragmentCount = rand(2, 3);
            $shuffledFragments = $descriptionFragments;
            shuffle($shuffledFragments);
            $description = implode('. ', array_slice($shuffledFragments, 0, $fragmentCount)) . '.';

            // Select a random price (sometimes with an old price for "sale" items)
            $price = $prices[array_rand($prices)];
            $hasOldPrice = (rand(0, 1) == 1);
            $oldPrice = $hasOldPrice ? $oldPrices[array_rand($oldPrices)] : null;

            // Random stock status
            $inStock = (rand(0, 5) > 0); // 5/6 chance to be in stock

            // Create the product
            $product = Product::create([
                'title' => $productName,
                'category_id' => $categoryId,
                'image' => $placeholderImages[array_rand($placeholderImages)],
                'price' => $price,
                'short_description' => $description,
                'in_stock' => $inStock,
            ]);

            // Add 3-6 random specs to the product
            $randomSpecCount = rand(3, 6);
            $shuffledSpecIds = $specIds;
            shuffle($shuffledSpecIds);
            $productSpecIds = array_slice($shuffledSpecIds, 0, $randomSpecCount);

            $product->specs()->attach($productSpecIds);

            $progressBar->advance();
        }

        $progressBar->finish();
        $this->command->info("\nSuccessfully created 200 products with their specifications!");
    }
}
