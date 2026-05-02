<?php

namespace App\Repositories;

use App\Models\Job;

class JobRepository
{
    public function find($id)
    {
        return Job::find($id);
    }

    public function paginate($perPage = 15)
    {
        return Job::paginate($perPage);
    }
}
