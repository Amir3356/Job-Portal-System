<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('job_id')->constrained()->onDelete('cascade');
            $table->text('cover_letter')->nullable();
            $table->string('resume_path')->nullable();
            $table->enum('status', ['pending', 'accepted', 'rejected'])->default('pending');
            $table->timestamps();
            
            // Prevent duplicate applications
            $table->unique(['user_id', 'job_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('applications');
    }
};
