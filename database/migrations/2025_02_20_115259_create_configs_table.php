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
        Schema::create('configs', function (Blueprint $table) {
            $table->id();
            $table->string("logo_src")->nullable();
            $table->string("site_name");
            $table->string("site_slogan");
            $table->string("hero_title");
            $table->string("hero_subtitle");
            $table->string("hero_img_src");
            $table->string("address");
            $table->string("telephone");
            $table->string("email");
            $table->string("instagram")->nullable();
            $table->string("linkedin")->nullable();
            $table->json('statistics')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('configs');
    }
};
