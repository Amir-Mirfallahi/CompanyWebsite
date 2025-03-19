<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class Product extends Model
{
    protected $guarded = [];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function specs(): BelongsToMany
    {
        return $this->belongsToMany(Spec::class, 'product_spec');
    }
    public function features(): BelongsToMany
    {
        return $this->belongsToMany(Feature::class, 'product_feature');
    }
    public function applications(): BelongsToMany
    {
        return $this->belongsToMany(Application::class, 'product_application');
    }
    public function documents(): BelongsToMany
    {
        return $this->belongsToMany(Document::class, 'product_document');
    }
    public function images(): BelongsToMany
    {
        return $this->belongsToMany(Image::class, 'product_image');
    }
}
