<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class AboutConfig extends Model
{
    public function heroImage()
    {
        return $this->hero_img_src ? Storage::url($this->hero_img_src) : null;
    }
}
