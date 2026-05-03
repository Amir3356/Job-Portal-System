<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('jobs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->string('company');
            $table->text('description');
            $table->text('requirements')->nullable();
            $table->string('location');
            $table->string('type'); // Full-time, Part-time, Contract, Remote
            $table->string('salary');
            $table->json('skills')->nullable();
            $table->enum('status', ['active', 'closed'])->default('active');
            $table->timestamp('created_at')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('jobs');
    }
};
