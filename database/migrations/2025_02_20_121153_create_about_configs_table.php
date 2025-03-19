<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('about_configs', function (Blueprint $table) {
            $table->id();
            $table->string("hero_img_src");
            $table->string("hero_title");
            $table->string("hero_subtitle");
            $table->string("story_subtitle");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('about_configs');
    }
};
