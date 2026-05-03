<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;

    protected $fillable = [
        'employer_id',
        'title',
        'company_name',
        'location',
        'employment_type',
        'salary_range',
        'description',
        'requirements',
        'skills',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'requirements' => 'array',
            'skills' => 'array',
        ];
    }

    public function employer()
    {
        return $this->belongsTo(User::class, 'employer_id');
    }

    public function applications()
    {
        return $this->hasMany(JobApplication::class);
    }
}