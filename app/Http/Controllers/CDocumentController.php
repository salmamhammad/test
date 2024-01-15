<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CUser;
use App\Models\CDocument;
use App\Models\UsersDocument;

class CDocumentController extends Controller
{
    //

    public function index()
    {
        return view('welcome');
    }

    public function editDocument(Request $request)
    {
        $cDocument=CDocument::find($request->id);
        $cDocument->name=$request->name;
        $cDocument->content=$request->content;
        $cDocument->save();
          
        $СUsersDocuments= UsersDocument::where('document_id', '=', $id)->get();
         foreach($СUsersDocuments as $СUsersDocument){
            $user= CUsers::find($СUsersDocument->user_id);

           $this->sendmail($user->email);
         }

         return response()->json(['status' => 'edit success']);

    }
    public function delDocument($id)
    {
        $cDocument=CDocument::find($id);
        $СUsersDocuments= UsersDocument::where('document_id', '=', $id)->get();
        foreach($СUsersDocuments as $СUsersDocument){

        $СUsersDocument->delete();
        }
        $cDocument->delete();
        return response()->json(['status' => 'delete success']);

    }


    public function sendmail($email)
    {

    }
}
