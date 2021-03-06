<?php
	
	ini_set('display_errors', 1);
    // Helper functions
    function de($var, $debug=true)
    {
        if($debug)
        {
            echo '<div class="debug">';
                var_dump($var);
            echo '</div>';
        }
    }

    // Includes
	if (function_exists('p2p_register_connection_type')){
		include 'lib/relations.php';
	}

	include 'lib/adminTweaks.php';
	include 'lib/rteTweaks.php';
	include 'lib/rteShortCodes.php';
    include 'lib/customwidgets.php';
    include 'lib/createCustomPostType.php';
    include 'breadcrumbs.php';

    add_filter( 'use_default_gallery_style', '__return_false' ); //Remove Gallery Inline Styling

    //register_sidebar(
        //array(
            //'name' => 'Index',
            //'description' => 'This widget area is on top of the content on the homepage',
            //'before_widget' => '<section id="%1$s" class="%2$s">',
            //'before_title'  => '<header><h2>',
            //'after_title'   => '</h2></header><div class="cnt">',
            //'after_widget'  => '</div></section>'
        //)
    //);

    register_sidebar(
        array(
            'name' => 'Homepage - Row 1',
            'description' => '',
            'before_widget' => '<section id="%1$s" class="%2$s">',
            'before_title'  => '<header><h2>',
            'after_title'   => '</h2></header><div class="content">',
            'after_widget'  => '</div></section>'
        )
    );

    register_sidebar(
        array(
            'name' => 'Homepage - Row 2',
            'description' => '',
            'before_widget' => '',
            'before_title'  => '',
            'after_title'   => '',
            'after_widget'  => ''
        )
	);

    register_sidebar(
        array(
            'name' => 'Homepage - Row 3',
            'description' => '',
            'before_widget' => '<section class="upcoming-events">',
            'before_title'  => '<header><h3>',
            'after_title'   => '</h3></header>',
            'after_widget'  => '</section>'
        )
    );

    register_sidebar(
        array(
            'name' => 'Footer',
            'description' => 'This is Footer widget area',
            'before_widget' => '<section id="%1$s" class="%2$s">',
            'before_title'  => '<header><h3>',
            'after_title'   => '</h3></header><div class="cnt">',
            'after_widget'  => '</div></section>'
        )
    );

    register_nav_menu( 'header', 'Header' );
    register_nav_menu( 'sidebar', 'Sidebar');
    register_nav_menu( 'sitemap', 'Sitemap');
    register_nav_menu( 'footer', 'Footer');

	//change author/username base to users/userID
	function change_author_permalinks() {
	  global $wp_rewrite;
	   // Change the value of the author permalink base to whatever you want here
	   $wp_rewrite->author_base = 'labbers';
	  $wp_rewrite->flush_rules();
	}
	add_action('init','change_author_permalinks');

	function users_query_vars($vars) {
		// add lid to the valid list of variables
		$new_vars = array('labbers');
		$vars = $new_vars + $vars;
		return $vars;
	}
	add_filter('query_vars', 'users_query_vars');

	function user_rewrite_rules( $wp_rewrite ) {
	  $newrules = array();
	  $new_rules['labbers/(\d*)$'] = 'index.php?author=$matches[1]';
	  $wp_rewrite->rules = $new_rules + $wp_rewrite->rules;
	}
	add_filter('generate_rewrite_rules','user_rewrite_rules');

	// Change the_excerpt character length
	function custom_excerpt_length( $length ) {
		return 40;
	}
	add_filter( 'excerpt_length', 'custom_excerpt_length', 999 );

	// Change the more string for the_excerpt function
	function new_excerpt_more( $more ) {
		return ' ...';
	}
	add_filter('excerpt_more', 'new_excerpt_more');



	

?>
