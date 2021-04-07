package web.d.svc;

import java.util.List;
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
import web.d.biz.CmmDetailManageBVC;
import web.d.biz.CmmManageBVC;
import web.d.dvo.CmmDVO;
import web.d.svo.CmmSVO;
import web.z.util.SearchVO;
import web.z.util.WebUtil;

@Controller
public class CmmManageSVC {


    @Resource(name = "CmmManageBVC")
    private CmmManageBVC cmmManageBVC;

    @Resource(name = "CmmDetailManageBVC")
    private CmmDetailManageBVC cmmDetailManageBVC;
    
    @Resource(name = "propertiesService")
    protected EgovPropertyService propertyService;
    

	/**
	 * 등록 화면으로 링크
	 */
	@RequestMapping(value = "/cmm/insertView.do")
	public String insertView(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
		return "web/d/a/UWEBDA001";
	}
	
	/**
	 * 정보를 등록한다.
	 *
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/cmm/insert.do")
	public String insert(@ModelAttribute("cmmSVO") CmmSVO cmmSVO, ModelMap model) throws Exception {
		
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
		
		// insert
		cmmManageBVC.insert(cmmSVO);
		model.addAttribute("result", "S");
		model.addAttribute("msg", "정상적으로 등록되었습니다.");

		return "forward:/cmm/list.do";
	}
	

    /**
     * 목록을 조회한다.
     *
     * @return
     * @throws Exception
     */
    @RequestMapping("/cmm/list.do")
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

    	Map<String, Object> map = cmmManageBVC.list(searchVO);
    	int totCnt = Integer.parseInt((String)map.get("resultCnt"));

		// 페이지 카운트가 2이상이면 결과값이 나오지 않아서 아래 로직을 추가함.
		if(totCnt <= 10) {

			paginationInfo.setCurrentPageNo(1);
			searchVO.setPageIndex(1);
		}
		
    	paginationInfo.setTotalRecordCount(totCnt);

    	model.addAttribute("resultList", map.get("resultList"));
    	model.addAttribute("resultCnt" , map.get("resultCnt"));
    	model.addAttribute("paginationInfo", paginationInfo);

    	return "web/d/a/UWEBDA002";
    }
    
    /**
	 * 정보를 수정한다.
	 *
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/cmm/update.do")
	public String update(@ModelAttribute("searchVO") SearchVO searchVO, @ModelAttribute("cmmSVO") CmmSVO cmmSVO, ModelMap model) throws Exception {

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
		cmmManageBVC.update(cmmSVO);
		model.addAttribute("result", "S");
		model.addAttribute("msg", "정상적으로 수정되었습니다.");

		return "forward:/cmm/detail.do";
	}
    
    
    /**
	 * 정보를 삭제한다.
	 *
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/cmm/delete.do")
	public String delete(@ModelAttribute("searchVO") SearchVO searchVO, @ModelAttribute("cmmSVO") CmmSVO cmmSVO, ModelMap model) throws Exception {
		
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
		cmmManageBVC.delete(cmmSVO);
		cmmDetailManageBVC.deleteAll(cmmSVO);
		
		model.addAttribute("result", "S");
		model.addAttribute("msg", "정상적으로 삭제되었습니다.");

		return "forward:/cmm/list.do";
	}
	

    /**
	 * 수정화면으로 이동
	 *
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/cmm/detail.do")
	public String detail(@ModelAttribute("searchVO") SearchVO searchVO, @ModelAttribute("cmmSVO") CmmSVO cmmSVO, ModelMap model) throws Exception {

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
		
		CmmDVO cmmDVO = cmmManageBVC.detail(cmmSVO);

    	model.addAttribute("resultDetailList", cmmDetailManageBVC.list(cmmSVO));
		model.addAttribute("cmmDVO", cmmDVO);
		model.addAttribute("result" , "S");
		
		return "web/d/a/UWEBDA003";
		
	}
	
	/**
	 * 공통구분코드 상세항목 정보를 등록한다.
	 *
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/cmmDetail/insert.do")
	public String insert(@ModelAttribute("searchVO") SearchVO searchVO, @ModelAttribute("cmmSVO") CmmSVO cmmSVO, ModelMap model) throws Exception {
		
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
		
		List<CmmSVO> svoList = cmmSVO.getCmmSVOList();
		
		for (CmmSVO svo : svoList) {
			
			svo.setScreenId(cmmSVO.getScreenId());
			
			String actionClCd = svo.getActionClCd();
			
			if(actionClCd.equals("I")) {
				cmmDetailManageBVC.insert(svo);
			} else if(actionClCd.equals("U")) {
				cmmDetailManageBVC.update(svo);
			} else if(actionClCd.equals("D")) {
				cmmDetailManageBVC.delete(svo);
			}
		}
		
		model.addAttribute("result", "S");
		model.addAttribute("msg", "정상적으로 등록되었습니다.");

		return "forward:/cmm/detail.do";
	}
	
}
