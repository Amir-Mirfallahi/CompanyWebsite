<?php

namespace App\Http\Controllers;

use App\Models\AboutConfig;
use App\Models\Certificate;
use Inertia\Inertia;
use \App\Models\ContactConfig;
use App\Models\Story;
use App\Models\TeamMember;
use App\Models\Value;
use App\Models\Product;

class HomeController extends Controller
{

    public function home()
    {
        // use getDefaultPageConfig function
        [$defaultProps, $config] = getDefaultPageConfig('');
        $products = Product::orderBy('created_at', 'desc')->limit(3)->get();

        // Default statistics if none are set in the config
        $defaultStatistics = [
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
        ];

        return Inertia::render('Home/HomePage', [
            ...$defaultProps,

            // بخش هیرو
            'hero' => [
                'title' => $config->hero_title ?? 'عنوان پیش‌فرض',
                'subtitle' => $config->hero_subtitle ?? 'زیرعنوان پیش‌فرض',
                'buttons' => [
                    'primary' => [
                        'text' => 'جستجوی محصولات',
                        'url' => '/products'
                    ],
                    'secondary' => [
                        'text' => 'تماس با ما',
                        'url' => '/contact'
                    ]
                ],
                'image_src' => $config->heroImage()
            ],

            // محصولات
            'products' => $products,

            // آمار و ارقام
            'statistics' => $config->statistics ?? $defaultStatistics,
        ]);
    }

    public function about()
    {
        // use getDefaultPageConfig function
        [$defaultProps, $_] = getDefaultPageConfig('/about');

        $aboutConfig = AboutConfig::first() ?? new AboutConfig();
        $stories = Story::all() ?? [];
        $values = Value::all() ?? [];
        $teamMembers = TeamMember::all() ?? [];
        $certificates = Certificate::all() ?? [];
        return Inertia::render('Home/AboutPage', [
            ...$defaultProps,

            'hero' => [
                'title' => $aboutConfig->hero_title,
                'subtitle' => $aboutConfig->hero_subtitle,
                'image' => $aboutConfig->hero_img_src
            ],

            'story' => [
                'title' => 'داستان ما',
                'content' => $aboutConfig->story_subtitle,
                'milestones' => $stories
            ],

            'values' => [
                'title' => 'ارزش‌های ما',
                'items' => $values
            ],

            'team' => [
                'title' => 'تیم ما',
                'description' => 'متشکل از متخصصان با تجربه در صنعت برق و الکترونیک',
                'members' => $teamMembers
            ],

            'certifications' => [
                'title' => 'گواهینامه‌ها و استانداردها',
                'items' => $certificates
            ]
        ]);
    }
    public function contact()
    {
        // use getDefaultPageConfig function
        [$defaultProps, $config] = getDefaultPageConfig('/contact');
        $contactConfig = ContactConfig::all() ?? [];

        $form_field = [
            'name' => [
                'label' => 'نام و نام خانوادگی',
                'type' => 'text',
                'required' => true
            ],
            'email' => [
                'label' => 'ایمیل',
                'type' => 'email',
                'required' => true
            ],
            'phone' => [
                'label' => 'شماره تماس',
                'type' => 'tel',
                'required' => true
            ],
            'department' => [
                'label' => 'بخش مورد نظر',
                'type' => 'select',
                'options' => ['فروش', 'پشتیبانی فنی', 'روابط عمومی'],
                'required' => true
            ],
            'message' => [
                'label' => 'پیام شما',
                'type' => 'textarea',
                'required' => true
            ]
        ];
        return Inertia::render('Home/ContactPage', [
            ...$defaultProps,

            'contactInfo' => [
                'title' => 'تماس با ' . $config->site_name,
                'subtitle' => 'با ما در ارتباط باشید',
                'description' => 'تیم پشتیبانی و فروش ما آماده پاسخگویی به سوالات شما هستند',
                'locations' => [
                    [
                        'title' => 'دفتر مرکزی',
                        'address' => $config->address,
                        'phone' => $config->telephone,
                        'email' => $config->email,
                    ],
                ],
                'departments' => $contactConfig,
                'socialMedia' => [
                    ['platform' => 'Instagram', 'url' => $config->instagram || '#', 'icon' => 'FaInstagram'],
                    ['platform' => 'LinkedIn', 'url' => $config->linkedin || '#', 'icon' => 'FaLinkedin'],
                ]
            ],

            'formFields' => $form_field
        ]);
    }
}