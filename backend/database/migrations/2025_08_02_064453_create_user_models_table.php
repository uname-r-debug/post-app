<?php
use Illuminate\Support\Facades\Schema;
return new class extends Illuminate\Database\Migrations\Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_models', function (Illuminate\Database\Schema\Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->longText('password');
            $table->uuid()->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_models');
    }
};
