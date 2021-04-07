package web.a.svc;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import egovframework.com.cmm.LoginVO;
import egovframework.com.cmm.util.EgovUserDetailsHelper;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import web.a.biz.UserManageBVC;
import web.a.dvo.UserDVO;
import web.a.svo.UserSVO;
import web.z.util.SearchVO;
import web.z.util.WebUtil;

@Controller
public class UserManageSVC {


    @Resource(name = "UserManageBVC")
    private UserManageBVC userManageBVC;

    @Resource(name = "propertiesService")
    protected EgovPropertyService propertyService;
    

	/**
	 * 등록 화면으로 링크
	 */
	@RequestMapping(value = "/user/insertView.do")
	public String insertView(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
		return "web/a/b/UWEBAB001";
	}
	
	/**
	 * 사용자의 정보를 등록한다.
	 *
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/user/insert.do")
	public String insert(@ModelAttribute("userSVO") UserSVO userSVO, ModelMap model) throws Exception {

		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		
		// 로그인 처리
		if(!isAuthenticated) {
			model.addAttribute("result", "E");
			model.addAttribute("msg"   , "로그인 후 이용하시기 바랍니다.");
			return "web/z/LoginUser";
		} 
		
		// 권한체크
		if(!WebUtil.checkMasterAuthority(user)) {
			
			return WebUtil.AUTH_ERROR_UI;
		}
		
		// 사용자 중복체크
		
		// insert
		userManageBVC.insert(userSVO);
		model.addAttribute("result", "S");
		model.addAttribute("msg", "정상적으로 등록되었습니다.");

		return "forward:/user/list.do";
	}
	

    /**
     * 목록을 조회한다.
     *
     * @return
     * @throws Exception
     */
    @RequestMapping("/user/list.do")
    public String list(@ModelAttribute("searchVO") SearchVO searchVO, ModelMap model) throws Exception {

		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		
		// 로그인 처리
		if(!isAuthenticated) {
			model.addAttribute("result", "E");
			model.addAttribute("msg"   , "로그인 후 이용하시기 바랍니다.");
			return "web/z/LoginUser";
		} 
		
		// 권한체크
		if(!WebUtil.checkMasterAuthority(user)) {
			
			return WebUtil.AUTH_ERROR_UI;
		}	

    	// page 설정
    	searchVO.setPageUnit(propertyService.getInt("pageUnit"));
    	searchVO.setPageSize(propertyService.getInt("pageSize"));

    	PaginationInfo paginationInfo = new PaginationInfo();

    	paginationInfo.setCurrentPageNo(searchVO.getPageIndex());
    	paginationInfo.setRecordCountPerPage(searchVO.getPageUnit());
    	paginationInfo.setPageSize(searchVO.getPageSize());

    	searchVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
    	searchVO.setLastIndex(paginationInfo.getLastRecordIndex());
    	searchVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());

    	Map<String, Object> map = userManageBVC.list(searchVO);
    	int totCnt = Integer.parseInt((String)map.get("resultCnt"));

		// 페이지 카운트가 2이상이면 결과값이 나오지 않아서 아래 로직을 추가함.
		if(totCnt <= 10) {

			paginationInfo.setCurrentPageNo(1);
			searchVO.setPageIndex(1);
		}
		
    	paginationInfo.setTotalRecordCount(totCnt);

    	model.addAttribute("resultList", map.get("resultList"));
    	model.addAttribute("resultCnt", map.get("resultCnt"));
    	model.addAttribute("paginationInfo", paginationInfo);

    	return "web/a/b/UWEBAB002";
    }
    
    /**
     * 팝업 목록을 조회한다.
     *
     * @return
     * @throws Exception
     */
    @RequestMapping("/user/popup/list.do")
    public String listCstmPopup(@ModelAttribute("searchVO") SearchVO searchVO, ModelMap model) throws Exception {

		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		
		// 로그인 처리
		if(!isAuthenticated) {
			model.addAttribute("result", "E");
			model.addAttribute("msg"   , "로그인 후 이용하시기 바랍니다.");
			return "web/z/LoginUser";
		} 
		
		// 권한체크
		if(!WebUtil.checkMasterAuthority(user)) {
			
			return WebUtil.AUTH_ERROR_UI;
		}	
		
		// 목록 조회
		list(searchVO, model);

    	return "web/a/b/UWEBAB004";
    }
    
    /**
	 * 사용자의 정보를 수정한다.
	 *
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/user/update.do")
	public String update(@ModelAttribute("searchVO") SearchVO searchVO, @ModelAttribute("userSVO") UserSVO userSVO, ModelMap model) throws Exception {

		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		
		// 로그인 처리
		if(!isAuthenticated) {
			model.addAttribute("result", "E");
			model.addAttribute("msg"   , "로그인 후 이용하시기 바랍니다.");
			return "web/z/LoginUser";
		} 
		
		// 권한체크
		if(!WebUtil.checkMasterAuthority(user)) {
			
			return WebUtil.AUTH_ERROR_UI;
		}
		
		// update
		userManageBVC.update(userSVO);
		model.addAttribute("result", "S");
		model.addAttribute("msg", "정상적으로 수정되었습니다.");

		return "forward:/user/detail.do";
	}
    
    
    /**
	 * 사용자의 정보를 삭제한다.
	 *
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/user/delete.do")
	public String delete(@ModelAttribute("searchVO") SearchVO searchVO, @ModelAttribute("userSVO") UserSVO userSVO, ModelMap model) throws Exception {
		
		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		
		// 로그인 처리
		if(!isAuthenticated) {
			model.addAttribute("result", "E");
			model.addAttribute("msg"   , "로그인 후 이용하시기 바랍니다.");
			return "web/z/LoginUser";
		} 
		
		// 권한체크
		if(!WebUtil.checkMasterAuthority(user)) {
			
			return WebUtil.AUTH_ERROR_UI;
		}	
		
		// delete
		userManageBVC.delete(userSVO);
		model.addAttribute("result", "S");
		model.addAttribute("msg", "정상적으로 삭제되었습니다.");

		return "forward:/user/list.do";
	}
	

    /**
	 * 사용자의 정보를 수정화면으로 이동
	 *
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/user/detail.do")
	public String detail(@ModelAttribute("searchVO") SearchVO searchVO, ModelMap model) throws Exception {

		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		
		// 로그인 처리
		if(!isAuthenticated) {
			model.addAttribute("result", "E");
			model.addAttribute("msg"   , "로그인 후 이용하시기 바랍니다.");
			return "web/z/LoginUser";
		} 
		
		// 권한체크
		if(!WebUtil.checkMasterAuthority(user)) {
			
			return WebUtil.AUTH_ERROR_UI;
		}
		
		UserSVO userSVO = new UserSVO();
		userSVO.setUserNo(searchVO.getUserNo());
		
		UserDVO userDVO = userManageBVC.detail(userSVO);
		
		model.addAttribute("userDVO", userDVO);
		model.addAttribute("result" , "S");

		return "web/a/b/UWEBAB003";
	}
}
