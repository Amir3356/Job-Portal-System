<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanyProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'company_name',
        'industry',
        'website',
        'about',
        'logo_path',
        'location',
    ];

    public function owner()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}