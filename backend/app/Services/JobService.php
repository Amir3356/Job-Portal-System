<?php

namespace App\Services;

use App\Models\Job;

class JobService
{
    public function list(array $filters = [])
    {
        $query = Job::query();
        return $query->paginate(15);
    }
}
