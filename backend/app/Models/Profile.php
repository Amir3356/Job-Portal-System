<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
        'user_id',
        'phone',
        'location',
        'bio',
        'skills',
        'experience',
        'resume_path',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
