<?php

use App\Models\Config;

if (!function_exists('getDefaultPageConfig')) {
    function getDefaultPageConfig($activePage)
    {
        $config = Config::first() ?? new Config(); // Ensure $config is always an object
        $navLinks = [
            [
                'label' => 'محصولات',
                'url' => '/products',
            ],
            [
                'label' => 'تماس با ما',
                'url' => '/contact',
            ],
            [
                'label' => 'درباره ما',
                'url' => '/about',
            ]
        ];
        $navLinks = array_map(function ($navLink) use ($activePage) {
            $navLink['isActive'] = ($navLink['url'] === $activePage) ? true : false;
            return $navLink;
        }, $navLinks);

        $defualtProps = [
            'header' => [
                'phone' => $config->telephone ?? 'N/A',
                'navLinks' => $navLinks,
                'logo' => $config->logo_src ?? '/default-logo.png',
                "site_name" => $config->site_name ?? 'اسم سایت',
                "site_slogan" => $config->site_slogan ?? 'شعار سایت'
            ],
            'footer' => [
                'contact' => [
                    'address' => $config->address ?? 'آدرس ثبت نشده',
                    'phone' => $config->telephone ?? 'تلفن ثبت نشده',
                    'email' => $config->email ?? 'ایمیل ثبت نشده'
                ],
                'social' => [
                    ['name' => 'instagram', 'url' => $config->instagram ?? '#'],
                    ['name' => 'linkedin', 'url' => $config->linkedin ?? '#'],
                ],
                'quickLinks' => $navLinks,
                "site_name" => $config->site_name ?? 'اسم سایت',
                "site_slogan" => $config->site_slogan ?? 'شعار سایت',
            ]
        ];
        return [$defualtProps, $config];
    }
}
