<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Config extends Model
{
    protected $fillable = [
        'logo_src',
        'site_name',
        'site_slogan',
        'hero_title',
        'hero_subtitle',
        'hero_img_src',
        'address',
        'telephone',
        'email',
        'instagram',
        'linkedin',
        'statistics',
    ];

    protected $casts = [
        'statistics' => 'array',
    ];

    public function logo()
    {
        return $this->logo_src ? Storage::url($this->logo_src) : null;
    }

    public function heroImage()
    {
        return $this->hero_img_src ? Storage::url($this->hero_img_src) : null;
    }
}
