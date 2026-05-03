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
        Schema::table('applications', function (Blueprint $table) {
            $table->string('phone')->nullable()->after('cover_letter');
            $table->integer('years_of_experience')->nullable()->after('phone');
            $table->string('portfolio_url')->nullable()->after('years_of_experience');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('applications', function (Blueprint $table) {
            $table->dropColumn(['phone', 'years_of_experience', 'portfolio_url']);
        });
    }
};
