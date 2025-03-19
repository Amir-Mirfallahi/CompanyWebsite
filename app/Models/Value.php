<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Value extends Model
{
    public function iconImage()
    {
        return Storage::url($this->icon_image);
    }
}
