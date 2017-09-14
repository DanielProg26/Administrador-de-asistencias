<?php

use App\Model\SeccionesModel;

$app->group('/seccion',function(){

    $this->get('/all',function($req, $res, $args){
        $m = new SeccionesModel();

        $result = $m->getAll($args['id_materia']);
        return $this->response->withJson($result);
    });

    $this->get('/{id}/{idP}',function($req, $res, $args){
        $m = new SeccionesModel();

        $result = $m->get($args['id'],$args['idP']);
        
        return $this->response->withJson($result);
    });

    $this->post('/add', function($req, $res){
        $m = new SeccionesModel();

        $params = $req->getParsedBody();

        $result = $m->add($params);
        
        return $this->response->withJson($result);
    });

    $this->put('/update', function($req, $res){
        $m = new SeccionesModel();

        $params = $req->getParsedBody();

        $result = $m->update($params);

        return $this->response->withJson($result, 200);
    });

    $this->get('/members/{id}', function($req, $res, $args){
        $m = new SeccionesModel();

        $result = $m->getMembers($args['id']);

        return $this->response->withJson($result, 200);
    });

    $this->get('/member/{id}', function($req, $res, $args){
        $m = new SeccionesModel();

        $result = $m->getMember($args['id']);

        return $this->response->withJson($result, 200);
    });

    $this->get('/member/delete/{id}', function($req, $res, $args){
        $m = new SeccionesModel();

        $result = $m->deleteMember($args['id']);

        return $this->response->withJson($result, 200);
    });

    $this->post('/member/add', function($req, $res){
        $m = new SeccionesModel();

        $params = $req->getParsedBody();

        $result = $m->addMember($params);
        
        return $this->response->withJson($result);
    });

    $this->get('/posts/{id}/{offset}', function($req, $res, $args){
        $m = new SeccionesModel();

        $result = $m->getPosts($args['id'], $args['offset']);

        return $this->response->withJson($result, 200);
    });

    $this->post('/posts/get', function($req, $res){
        $m = new SeccionesModel();

        $params = $req->getParsedBody();
        
        $result = $m->getPost($params['id']);

        return $this->response->withJson($result, 200);
    });

    $this->post('/post/add', function($req, $res){
        $m = new SeccionesModel();

        $directory = $this->upload;
        $archivos = $req->getUploadedFiles();

        $params = $req->getParsedBody();

        if(isset($archivo)):
            $archivo = $archivos['archivo'];
            if (!empty($archivo)):
                if ($archivo->getError() === UPLOAD_ERR_OK):
                    $filename = moveUploadedFile($directory, $archivo);
                endif;
            endif;
        else:
            $filename = NULL;
        endif;

        $result = $m->addPost($params, $filename);
        
        return $this->response->withJson($result);
    });

    $this->post('/posts/delete', function($req, $res){
        $m = new SeccionesModel();

        $params = $req->getParsedBody();

        return $this->response->withJson($m->deletePost($params), 200);
    });

})->add($mw);