<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::post('/document/edit','App\Http\Controllers\CDocumentController@editDocument')->name('editDocument');
Route::get('/document/delete/{id}','App\Http\Controllers\CDocumentController@delDocument')->name('delDocument');


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
