<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Spec extends Model
{
    public function product(): BelongsToMany {
        return $this->belongsToMany(Product::class, 'product_spec');
    }
}
